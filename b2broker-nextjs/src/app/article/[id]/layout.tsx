export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <div className="overflow-scroll py-5">{children}</div>
}
