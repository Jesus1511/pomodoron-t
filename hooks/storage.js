import AsyncStorage from '@react-native-async-storage/async-storage';

// Guardar una sesión
export async function setSesion(data) {
    try {
        if (data.workingTime + data.sesionTime < 60) {
            return;
        }
        let sessions = JSON.parse(await AsyncStorage.getItem('sessions')) || [];
        sessions.unshift({ _id: sessions.length, ...data });
        sessions = sessions.map((session, index) => ({ ...session, _id: index }));
        await AsyncStorage.setItem('sessions', JSON.stringify(sessions));
    } catch (error) {
        console.error("Error setting work session:", error);
    }
}

// Obtener todas las sesiones
export async function useSesionsStorage() {
    try {
        const sessions = JSON.parse(await AsyncStorage.getItem('sessions')) || [];
        return sessions;
    } catch (error) {
        console.error("Error getting work sessions:", error);
        return [];
    }
}

// Limpiar todas las sesiones
export async function cleanStorageSesions() {
    try {
        await AsyncStorage.removeItem('sessions');
    } catch (error) {
        console.error("Error deleting all work sessions:", error);
    }
}


export async function cleanStorageState () {
    try {
        await AsyncStorage.setItem('workingTime',"0")
        await AsyncStorage.setItem('restingTime',"0")
        await AsyncStorage.setItem('registered',"false")
        await AsyncStorage.setItem('timerState','1')
        await AsyncStorage.setItem('actualStartSesionDate', "no date")
        await AsyncStorage.setItem('sesionMaxTime',"0");
        await AsyncStorage.setItem('restBudgeting',"0");
    } catch (err) {
        console.error("error cleaning aplication state data from storage :", err)
    }
}

export async function useTimeConfig () {
    const storedSelectedHour1 = parseInt(await AsyncStorage.getItem('selectedHour1')) || 0;
    const storedSelectedMinute1 = parseInt(await AsyncStorage.getItem('selectedMinute1')) || 0;
    const storedSelectedHour2  = parseInt(await AsyncStorage.getItem('selectedHour2' )) || 0;
    const storedSelectedMinute2  = parseInt(await AsyncStorage.getItem('selectedMinute2' )) || 0;

    return {storedSelectedHour1, storedSelectedMinute1, storedSelectedHour2, storedSelectedMinute2}
}

export async function useStateStorage () {
    try {
        const storedWorkingTime = parseInt(await AsyncStorage.getItem('workingTime')) || 0;
        const storedRestingTime = parseInt(await AsyncStorage.getItem('restingTime')) || 0;
        const storedTimerState  = parseInt(await AsyncStorage.getItem('timerState' )) || 1;
        const storedRegistered  = (await AsyncStorage.getItem('registered')) === 'true';
        const lastTimestamp = parseInt(await AsyncStorage.getItem('lastTimestamp'));
        const startSesionDate = parseInt(await AsyncStorage.getItem('startSesionDate'))
        const storedSesionMaxTime = parseInt(await AsyncStorage.getItem('sesionMaxTime')) || 0;
        const storedRestBudgeting = parseInt(await AsyncStorage.getItem('restBudgeting')) || 0;
        return { storedRestBudgeting, storedSesionMaxTime, storedWorkingTime, startSesionDate, storedRestingTime, storedTimerState, storedRegistered, lastTimestamp }
    } catch (err) {
        console.error("error getting aplication state data from storage :", err)
    }

}