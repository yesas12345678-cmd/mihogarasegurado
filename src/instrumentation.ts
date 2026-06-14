export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    try {
      const { syncUploads } = await import('./lib/syncUploads');
      await syncUploads();
    } catch (err) {
      console.error("Failed to run syncUploads in instrumentation register:", err);
    }
  }
}
