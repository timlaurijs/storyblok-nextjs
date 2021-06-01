import React from 'react'
import styles from '../../styles/Home.module.css'

import Storyblok from '../../lib/storyblok'
import useStoryblok from '../../lib/storyblok-hook'
import DynamicComponent from '../../components/dynamic-component'

const Slug = (props) => {
  const story = useStoryblok(props.story)
  return (
    <div className={styles.container}>
      <h1>Shop</h1>
      <main>
        {story
          ? story.content.body.map((blok) => (
              <DynamicComponent blok={blok} key={blok._uid} />
            ))
          : null}
      </main>
    </div>
  )
}

export async function getStaticProps(context) {
  let slug = `shop/${context.params.slug}`
  let params = {
    version: 'draft', // or 'published'
  }
  if (context.preview) {
    params.version = 'draft'
    params.cv = Date.now()
  }
  let { data } = await Storyblok.get(`cdn/stories/${slug}`, params)

  return {
    props: {
      story: data ? data.story : false,
      preview: context.preview || false,
    },
    revalidate: 10,
  }
}

export async function getStaticPaths() {
  const { data } = await Storyblok.get('cdn/stories', {
    starts_with: 'shop/',
  })
  const pages = data.stories.map((page) => ({ params: { slug: page.slug } }))

  return {
    paths: [...pages],
    fallback: false,
  }
}
export default Slug
