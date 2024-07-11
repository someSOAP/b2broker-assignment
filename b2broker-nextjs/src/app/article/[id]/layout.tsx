export default function RootLayout({
  children,
  comments,
}: Readonly<{
  children: React.ReactNode
  comments: React.ReactNode
}>) {
  return (
    <div className="overflow-scroll">
      {children}
      <div>{comments}</div>
    </div>
  )
}
