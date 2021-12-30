import { createElement } from 'react'
import { FontAwesome, FontAwesome5, AntDesign, Ionicons } from '@expo/vector-icons'

export const convertDate = (date) => {

    console.log('date: ', date)    
    let year            = date.getFullYear()

    let month           = date.getMonth() + 1
    let day             = date.getDate()

    let hour            = date.getHours()
    let minute          = date.getMinutes()
    let second          = date.getSeconds()
    const ampm          = hour >= 12 ? 'pm' : 'am'

    //refine
    month               = month >= 10 ? month : '0' + month
    day                 = day >= 10 ? day : '0' + day
    hour                = hour >= 10 ? hour : '0' + hour
    minute              = minute >= 10 ? minute : '0' + minute
    second              = second >= 10 ? second : '0' + second

    const totalDate = `${year}-${month}-${day} ${hour}:${minute}:${second}`

    return totalDate
}

export const dateID = (date) => {
    let year            = date.getFullYear()
    let month           = date.getMonth() + 1
    let day             = date.getDate()

    let hour            = date.getHours()
    let minute          = date.getMinutes()
    let second          = date.getSeconds()

    //refine
    month               = month >= 10 ? month : '0' + month
    day                 = day >= 10 ? day : '0' + day
    hour                = hour >= 10 ? hour : '0' + hour
    minute              = minute >= 10 ? minute : '0' + minute
    second              = second >= 10 ? second : '0' + second

    const totalDate = `${year}${month}${day}-${hour}${minute}${second}`

    return totalDate
}

export const CustomIcon = (props) => {
    const { type, style, icon, size, color } = props
    let typeClass
  
    //set typeClass
    switch (type) {
        case 'AntDesign'                : typeClass = AntDesign;                break;
        case 'Ionicons'                 : typeClass = Ionicons;                 break;
        case 'FontAwesome'              : typeClass = FontAwesome;              break;
        case 'FontAwesome5'             : typeClass = FontAwesome5;              break;
    }
  
    //render element
    return createElement(typeClass, { style: style, name: icon, size: size, color: color }, null)
  }
  


