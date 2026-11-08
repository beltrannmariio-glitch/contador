
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Cache-Control": "no-store"
};

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: cors
  });
}

export async function GET() {
  try {
    const total = await redis.incr("visitas-consultorio");

    return Response.json(
      { total },
      { headers: cors }
    );

  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "No se pudo registrar la visita" },
      {
        status: 500,
        headers: cors
      }
    );
  }
}
