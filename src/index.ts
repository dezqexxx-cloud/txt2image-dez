import { Ai } from "@cloudflare/ai";

export default {
  async fetch(request, env) {
    try {
      const { prompt } = await request.json();

      const ai = new Ai(env.AI);

      const result = await ai.run(
        "@cf/stabilityai/stable-diffusion-xl-base-1.0",
        { prompt }
      );

      return new Response(JSON.stringify(result), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (err) {
      return new Response(
        JSON.stringify({ error: err.message }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  },
};
