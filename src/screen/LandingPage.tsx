import FirstHomePageSection from '../components/FirstHomePageSection'
import { Box } from '@mui/material'
import SecondHomePageSection from '../components/SecondHomepageSection'
import Header from '../components/Header'
import Footer from '../components/Footer'

const LandingPage = () => {
  return (
    <Box sx={{backgroundColor:'#7a1bad'}}>
    <Header />
    <FirstHomePageSection />
    <SecondHomePageSection />
    <Footer />
    </Box>
  )
}

export default LandingPage