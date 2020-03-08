import { useState, useEffect } from 'react'
import axios from 'axios'

interface IFetcher {
  url: string,
  page: number
}

interface IDataItem {
  id: string,
  author: string,
  width: number,
  height: number,
  url: string,
  download_url: string
}

const useFetcher = ({ url, page }: IFetcher) => {
  const [data, setData] = useState<IDataItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async ({ url, page }: IFetcher) => {
      setLoading(true)

      try {
        const response = await axios({ method: 'GET', url, params: { page } })

        setData((prevData) => [...prevData, ...response.data])
      } catch (e) {
        setError(e)
      } finally {
        setLoading(false)
      }
    }

    fetchData({ url, page })
  }, [url, page])

  return { data, loading, error }
}

export default useFetcher
