// You have to import connectToDB everytime cause it's a lamda function meaning 
// it's going to die everytime after doing it's job!
import { connectToDB } from '@utils/database'
import Prompt from '@models/prompt'

export const GET = async (req) => {
    try {
        await connectToDB()

        const prompts = await Prompt.find({}).populate('creator')

        return new Response(JSON.stringify(prompts), {status: 200})
    } catch (error) {
        return new Response("Failed to fetch all prompts", {status: 500})
    }
}