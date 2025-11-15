export const metadata = {
  title: 'الشريط المفقود - لعبة الغموض والهزل',
  description: 'لعبة ويب تفاعلية تجمع بين الغموض والكوميديا',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  )
}
