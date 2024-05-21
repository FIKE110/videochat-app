import { Card } from '@mui/joy'
import { Box, Typography } from '@mui/material'
import PrivacyImage from '../assets/privacy_4413865.png'
import P2PFeatureImage from '../assets/p2p_1700191.png'
import EasyImage from '../assets/easy.png'
import VideoCallImage from '../assets/video-chat_5795501.png'

const SecondHomePageSection = () => {
  return (
    <Box sx={{marginX:5,backgroundColor:'white',borderRadius:'20px'}}>
        <Box sx={{paddingX:5,paddingY:2}}>
            <Typography variant='h4' fontWeight='bold' 
            paddingTop={2}
            color='#7a1bad'>Why Choose VideoBuddy P2P?</Typography>
        </Box>
        <Box sx={{display:'flex',gap:8,justifyContent:'space-around',alignItems:'center',padding:7}}>
          {
            features.map(item=> <FeatureCard heading={item.heading} image={item.image}/>)
          }
        </Box>
    </Box>
   
  )
}

type FeatureType={
  heading:string,
  image?:string,
  description?:string
}

function FeatureCard({heading,image}:FeatureType){
  return(
    <Card sx={{flex:1,justifyContent:'center',alignItems:'center',background:'transparent',border:'none',
    backgroundColor:'#7a1bad',
    width:'1202px'
    }}>
      <img src={image} style={{width:120,height:'auto'}}/>
      <Typography variant='h6' color='white'>{heading}</Typography>
    </Card>
   
  )
}

export default SecondHomePageSection

const features: FeatureType[] = [
  {
    heading: "Direct Connection",
    image:P2PFeatureImage
  },
  {
    heading: "Unmatched Privacy",
    image:PrivacyImage
  },
  {
    heading: "Video and Audio",
    image:VideoCallImage
  },
  {
    heading: "Easy to Use",
    image:EasyImage
  },
];
