export const transformComment = (comment: {
	author_id: string;
	content: string;
	id: string;
	post_id: string;
	published_at: string;
}) => ({
	authorId: comment.author_id,
	content: comment.content,
	id: comment.id,
	postId: comment.post_id,
	publishedAt: comment.published_at,
});
