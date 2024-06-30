import { useMediaQuery } from "@mui/material"


export function useDeviceSmall(){
    const smalldevices=useMediaQuery("(max-width: 600px)")
    return smalldevices
}