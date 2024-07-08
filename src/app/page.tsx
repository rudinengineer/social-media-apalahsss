"use client"
import CreatePost from "@/components/post/CreatePost";
import CommentsPopup from "@/components/post/CommentsPopup";
import Post from "@/components/puzzle/Post";
import Layout from "@/layouts/Layout";
import { Axios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React from "react";
import PostSkeleton from "@/components/loading/skeleton/PostSkeleton";
import CreatePostSkeleton from "@/components/loading/skeleton/CreatePostSkeleton";

export default function Home() {
  const { data: session, status } = useSession()
  const [showComment, setShowComment] = React.useState<number|null>(null)

  const data = useQuery({
    queryKey: ['fetch-post-data'],
    queryFn: async () => {
      const response = await Axios.get('/post')
      return response.data
    }
  })

  return (
    <Layout>
      <div className='px-2 w-full pb-16 min-h-screen'>
        <div className="px-1 ss:px-2 pt-0">
          {
            status === 'loading' ? (<CreatePostSkeleton />) : (
              <div>
                {
                  (status === 'authenticated' && session?.user) && (<CreatePost />)
                }
              </div>
            )
          }
          {
            data.isLoading ? (
              <div>
                <PostSkeleton />
              </div>
            ) : (
              <div>
                {
                  data.isSuccess && data.data?.data?.length ? (
                    <div>
                      {
                        data.data?.data?.length ? (
                          <div>
                            {
                              data.data?.data?.map((value: any, index: number) => (
                                <div className='mb-6' key={index}>
                                  <Post data={value} setShowComment={setShowComment} />
                                </div>
                              ))
                            }
                          </div>
                        ) : (
                          <div className="flex-center p-4 bg-light dark:bg-dark rounded-lg">
                            <h1 className="text-center font-semibold">Postingan tidak ditemukan.</h1>
                          </div>
                        )
                      }
                    </div>
                  ) : (
                    <div className="flex-center p-4 bg-light dark:bg-dark rounded-lg">
                      <h1 className="text-center font-semibold">Something wen&apos;t wrong.</h1>
                    </div>
                  )
                }
              </div>
            )
          }
        </div>
        {
          showComment && (<CommentsPopup postId={showComment} setShowComment={setShowComment} />)
        }
      </div>
    </Layout>
  );
}
