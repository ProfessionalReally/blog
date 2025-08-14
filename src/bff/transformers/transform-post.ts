export const transformPost = (post: {
	content: string;
	id: string;
	image_url: string;
	published_at: string;
	title: string;
}) => ({
	content: post.content,
	id: post.id,
	imageUrl: post.image_url,
	publishedAt: post.published_at,
	title: post.title,
});
