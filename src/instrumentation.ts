export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    try {
      const { syncUploads } = await import('./lib/syncUploads');
      await syncUploads();
    } catch (err) {
      console.error("Failed to run syncUploads in instrumentation register:", err);
    }

    // self-scheduler background loop
    console.log("[Instrumentation] Registering Next.js background self-scheduler for Mi Hogar Asegurado...");
    
    // Import database pool
    try {
      const { pool } = await import('./lib/db');
      const { exec } = await import('child_process');
      const path = await import('path');
      
      const checkAndRunCron = async () => {
        try {
          const now = new Date();
          const madridTime = new Date(now.toLocaleString("en-US", { timeZone: "Europe/Madrid" }));
          const currentHour = madridTime.getHours();
          
          console.log(`[Self-Scheduler] Check triggered at ${madridTime.toLocaleString()} (Spain local). Hour: ${currentHour}`);
          
          // Only run if it's 2 AM or later (Spain peninsular time)
          if (currentHour >= 2) {
            // Check if there is a successful run in the last 21 hours
            const result = await pool.query(
              `SELECT id FROM cron_logs 
               WHERE script_name = 'scheduleDailyArticles.mjs' 
                 AND status = 'SUCCESS'
                 AND started_at >= NOW() - INTERVAL '21 hours'`
            );
            
            if (result.rows.length === 0) {
              // Check if there is already a run marked as RUNNING in the last 30 minutes
              const runningCheck = await pool.query(
                `SELECT id FROM cron_logs 
                 WHERE script_name = 'scheduleDailyArticles.mjs' 
                   AND status = 'RUNNING'
                   AND started_at >= NOW() - INTERVAL '30 minutes'`
              );
              
              if (runningCheck.rows.length === 0) {
                console.log("[Self-Scheduler] No successful run in the last 21 hours. Starting daily article generation...");
                
                // Register RUNNING state immediately to lock other triggers
                await pool.query(
                  `INSERT INTO cron_logs (script_name, status, details) 
                   VALUES ($1, $2, $3)`,
                  ['scheduleDailyArticles.mjs', 'RUNNING', 'Iniciado automáticamente por el auto-planificador de la app (instrumentation)']
                );
                
                // Execute the script in a child process
                const scriptPath = path.join(process.cwd(), 'scripts/scheduleDailyArticles.mjs');
                exec(`node ${scriptPath}`, (error, stdout, stderr) => {
                  if (error) {
                    console.error(`[Self-Scheduler] Child process error: ${error.message}`);
                    return;
                  }
                  console.log(`[Self-Scheduler] Child process output:\n${stdout}`);
                  if (stderr) {
                    console.error(`[Self-Scheduler] Child process stderr:\n${stderr}`);
                  }
                });
              } else {
                console.log("[Self-Scheduler] A cron run is already in RUNNING state.");
              }
            } else {
              console.log("[Self-Scheduler] Cron has already run successfully in the last 21 hours.");
            }
          } else {
            console.log("[Self-Scheduler] Skipping check, hour is before 2 AM Spain local.");
          }
        } catch (errLoop: any) {
          console.error("[Self-Scheduler] Error in check loop:", errLoop.message);
        }
      };
      
      // Run immediate check on startup (with 30s delay to let server boot up completely)
      setTimeout(() => {
        checkAndRunCron().catch(console.error);
      }, 30000);
      
      // Repeat the check every 30 minutes
      setInterval(() => {
        checkAndRunCron().catch(console.error);
      }, 30 * 60 * 1000);

    } catch (dbErr: any) {
      console.error("[Instrumentation] Failed to load DB pool or start self-scheduler:", dbErr.message);
    }
  }
}
