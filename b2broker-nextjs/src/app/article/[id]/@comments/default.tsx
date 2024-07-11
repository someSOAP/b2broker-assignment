import CommentsSlot, { CommentsSlotProps } from './page'

// https://github.com/vercel/next.js/discussions/48340#discussioncomment-9095635
export default function Default(props: CommentsSlotProps) {
  return <CommentsSlot {...props} />
}
