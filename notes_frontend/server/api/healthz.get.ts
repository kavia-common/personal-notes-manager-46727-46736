import { H3Event } from 'h3'

// PUBLIC_INTERFACE
/**
 * Health check endpoint.
 * Returns 200 OK with basic status info to verify server liveness.
 */
export default defineEventHandler((event: H3Event) => {
  return {
    status: 'ok',
    name: 'notes_frontend',
    time: new Date().toISOString(),
  }
})
