import SbEditable from 'storyblok-react'
import Teaser from './teaser'
import Grid from './grid'
import Feature from './feature'
import Image from './image'
import Description from './description'

// resolve Storyblok components to Next.js components
const Components = {
  'teaser': Teaser,
  'grid': Grid,
  'feature': Feature,
  'image': Image,
  'description': Description,
}
 
const DynamicComponent = ({blok}) => {
  // check if component is defined above
  if (typeof Components[blok.component] !== 'undefined') {
    const Component = Components[blok.component]
    // wrap with SbEditable for visual editing
    return (<SbEditable content={blok}><Component blok={blok} /></SbEditable>)
  }
 
  return (<p>The component <strong>{blok.component}</strong> has not been created yet.</p>)
}
 
export default DynamicComponent