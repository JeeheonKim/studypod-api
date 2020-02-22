import { isAuthenticated } from "../../../middlewares"

export default {
    Mutation: {
        toggleBookmark: async (_, args, {request}) => {
            isAuthenticated(request);
            const { postId } = args;
            const { user } = request;
            return true;
        }
    }
}