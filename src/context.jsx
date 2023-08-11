import React, { useContext, useReducer, useState, useEffect } from 'react'
const AppContext = React.createContext()
const AppProvider = ({ children }) => {
  const [userData, setUserData] = useState(localStorage.getItem('aidreach_donor')||localStorage.getItem('aidreach_ngo')||null)
  
  const divideToThree = (noEle, arr) => {
    let sta = 0
    let en = noEle
    let result = []
    while (sta < arr.length) {
      result.push(arr.slice(sta, en))
      sta = en
      en += noEle
    }
    return result
  }
  


  return (
    <AppContext.Provider
      value={{
       userData,
        setUserData,
        divideToThree,
        
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
// custom hook
const useGlobalContext = () => {
  return useContext(AppContext)
}
export { AppContext, AppProvider, useGlobalContext }

