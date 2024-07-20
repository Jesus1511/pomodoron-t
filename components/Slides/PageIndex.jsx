import { StyleSheet, View, Animated, useWindowDimensions } from 'react-native'
import React from 'react'

export const PageIndex = ({slides, scrollX}) => {

    const {width} = useWindowDimensions()

    return (
    <View style={styles.view}>
      {
        Array.from({ length: slides }).map((_, i) => {
            const inputRange = [(i-1) * width, i * width, (i + 1) * width];

            const dotWidth = scrollX.interpolate({
                inputRange,
                outputRange : [10, 20, 10],
                extrapolate:"clamp",
            })

            return <Animated.View style={[styles.dot,{width:dotWidth}]} key={i}/>
          }) 
      }
    </View>
  )
}

export default PageIndex

const styles = StyleSheet.create({
    view: {
        justifyContent: "space-around",
        alignItems:"center",
        flexDirection:"row",
        marginBottom:20
    },
    dot: {
        height:12,
        marginHorizontal:5,
        borderRadius:100,
        backgroundColor: "white"
    }
})