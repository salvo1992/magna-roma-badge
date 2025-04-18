// ✅ StatisticsScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
import { VictoryBar } from 'victory';
import { VictoryPie } from 'victory';
import { getAttendance } from '../storage/attendanceStorage';
import colors from '../assets/colors';
import { getTimbratureByPeriodo } from '../services/attendanceService';

export default function StatisticsScreen() {
  const [totalHours, setTotalHours] = useState(0);
  const [absence, setAbsence] = useState(2); // mock dato
  const [delay, setDelay] = useState(1); // mock dato
  const [selectedPeriod, setSelectedPeriod] = useState<'giorno' | 'settimana' | 'mese'>('settimana');


  useEffect(() => {
    const load = async () => {
      const filtered = await getTimbratureByPeriodo(selectedPeriod);
      const total = filtered
        .filter(r => r.type === 'uscita' && r.durataOre)
        .reduce((acc, val) => acc + parseFloat(val.durataOre || '0'), 0);
      setTotalHours(total);
    };
    load();
  }, [selectedPeriod]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Statistiche Settimana</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 20 }}>
      {['giorno', 'settimana', 'mese'].map(p => (
       <Button key={p} title={p} onPress={() => setSelectedPeriod( p)} />
         ))}
       </View>
      
      <VictoryPie
        data={[
          { x: 'Ore lavorate', y: totalHours },
          { x: 'Assenze', y: absence },
          { x: 'Ritardi', y: delay }
        ]}
        colorScale={[colors.romaGold, '#ccc', '#c44']}
        innerRadius={50}
        labelRadius={75}
        style={{ labels: { fill: 'white', fontSize: 14 } }}
      />

      <VictoryBar
        data={[
          { x: 'Lun', y: 5 },
          { x: 'Mar', y: 7 },
          { x: 'Mer', y: 6 },
          { x: 'Gio', y: 0 },
          { x: 'Ven', y: 8 },
        ]}
        style={{ data: { fill: colors.romaGold } }}
        animate={{ duration: 500 }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.romaRed, padding: 20 },
  title: { fontSize: 20, color: colors.romaGold, marginBottom: 20, textAlign: 'center' }
});



