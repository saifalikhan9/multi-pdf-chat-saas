
export const Footer = () => {
  const date = new Date();

  return (
    <footer className=" mt-20 py-8">
      <div className="bg-primary-foreground w-full h-px mask-l-from-1% mask-r-from-1% my-1" />

      <div className="max-w-7xl mx-auto px-4 text-center text-muted-foreground">
        <p>&copy; {date.getFullYear()} PDFChat AI. All rights reserved.</p>
      </div>
    </footer>
  )
}
