import Head from "next/head"

const Layout = (props) => {
  const { title, children } = props

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <main className="bg-slate-900 text-slate-300 h-screen">
        <header></header>
        <div className="p-4">
          <h1 className="text-4xl font-bold pb-5">{title}</h1>
          <div>{children}</div>
        </div>
        <footer></footer>
      </main>
    </>
  )
}
export default Layout
