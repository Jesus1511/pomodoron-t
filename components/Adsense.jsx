import { StyleSheet, } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { AdmobContext } from './Timer'

const Adsense = () => {

    const {rewarded} = useContext(AdmobContext)

    useEffect(() => {
        rewarded.show()

    },[])

  return (
    <>
    </>
  )
}

export default Adsense

const styles = StyleSheet.create({})