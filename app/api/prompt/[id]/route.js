import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

// GET a prompt by ID
export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const prompt = await Prompt.findById(params.id).populate("creator");
    if (!prompt) return new Response("Prompt Not Found", { status: 404 });

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    console.error("GET error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};

// PATCH (update) a prompt by ID
export const PATCH = async (request, { params }) => {
  try {
    const { prompt, tag } = await request.json();
    await connectToDB();

    const existingPrompt = await Prompt.findById(params.id);
    if (!existingPrompt) {
      return new Response("Prompt not found", { status: 404 });
    }

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;
    await existingPrompt.save();

    return new Response("Successfully updated the prompt", { status: 200 });
  } catch (error) {
    console.error("PATCH error:", error);
    return new Response("Error Updating Prompt", { status: 500 });
  }
};

// DELETE a prompt by ID
export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    const deletedPrompt = await Prompt.findByIdAndDelete(params.id);
    if (!deletedPrompt) {
      return new Response("Prompt not found", { status: 404 });
    }

    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (error) {
    console.error("DELETE error:", error);
    return new Response("Error deleting prompt", { status: 500 });
  }
};
