import HomeCard from "@/components/home/homeCard"
interface Article {
  id: number
  title: string
  description: string
  created_at?: Date
  update_at?: Date
  image?: {
    url: string
  }
}

/* eslint-disable @next/next/no-img-element */
const Home = async () => {
  const algo = [
    {
      title: "AAA",
      description: "aaaaaa"
    },
    {
      title: "AAA",
      description: "aaaaa"
    },
    {
      title: "BBB",
      description: "bbbfedrb"
    },
    {
      title: "BBfff3B",
      description: "bbrfrfefbbbbb"
    },
    {
      title: "fdd",
      description: "bbbbbb"
    },
    {
      title: "wqdw",
      description: "bbbbb"
    },
  ]

  const handleFetchArticles = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles10`)

      if (!res.ok) {
        throw new Error("Falha fetch data")
      }

      return res.json()
    } catch (error) {
      return []
    }
  }

  const articles: Article[] = await handleFetchArticles()
  return (
    <>
      <div className="container">
        <HomeCard name="Notícias" link="/articles" data={articles} />
      </div>
    </>
  )
}

export default Home
