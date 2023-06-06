// You have to import connectToDB everytime cause it's a lamda function meaning 
// it's going to die everytime after doing it's job!
import { connectToDB } from '@utils/database'
import Prompt from '@models/prompt'


// params is like props. when you call this api and pass in dynamic values, you use params
// in this case params.id
export const GET = async (req, {params}) => {
    try {
        await connectToDB()

        const prompts = await Prompt.find({
            creator: params.id
        }).populate('creator')

        return new Response(JSON.stringify(prompts), {status: 200})
    } catch (error) {
        return new Response("Failed to fetch all prompts", {status: 500})
    }
}