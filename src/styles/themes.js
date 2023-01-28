
import { createGlobalStyle } from "styled-components"

export const lightTheme = {
    body:'#e5e3df',
    fontColor:'#333',
    sidebar:'#d9d7d4',
    buttonBgr:'#644646',
    hover:'#CECCC9',
    activeNav:'#D9D7D4',
    colorActive:'#A07E7C',
    rightColor:'#966868',
    padding:'0px',
    chartSongBgr:'rgba(255,255,255,0.5)',
    Mode:'#355ED7',
    colorMode:'#fff',
    hoverTitle:'#844D4D'

}




export const darkTheme = {
    body:'#162a45',
    fontColor:'#fff',
    sidebar:'#22354e',
    // fontArtist:'#fff',
    buttonBgr:'#355ED7',
    hover:'#3A516E',
    activeNav:'#394A60',
    colorActive:'#fff',
    rightColor:'#fff',
    padding:'10px',
    chartSongBgr:'#22354e',
    Mode:'#fff',
    colorMode:'#355ED7',
    hoverTitle:'#fff'


}

export const GlobalStyles = createGlobalStyle`
        body{
            background-color: ${props => props.theme.body};
            color: ${props => props.theme.fontColor}
            /* background-color: ${props => props.theme.main}; */
        }
`