//rnfs
import React, { useState } from "react";
import {
  Alert,
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export default function Bmi() {
  // สร้าง State สำหรับค่าน้ำหนัก ส่วนสูง ผลลัพธ์ BMI และการแปรผล
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [result, setResult] = useState("0.00");
  const [resultText, setResultText] = useState("การแปรผล");

  // ฟังก์ชันสำหรับการกดปุ่ม รีเซ็ต
  const handleResetPress = () => {
    Keyboard.dismiss(); // ซ่อนแป้นพิมพ์
    setHeight("");
    setWeight("");
    setResult("0.00");
    setResultText("การแปรผล");
  };

  // ฟังก์ชันสำหรับการกดปุ่ม คำนวณ
  const handleCalPress = () => {
    Keyboard.dismiss(); // ซ่อนแป้นพิมพ์

    //Validate
    if (weight.length == 0 || height.length == 0) {
      Alert.alert("คำเตือน", "กรุณาป้อนค่าน้ำหนักและส่วนสูง");
      return;
    }
    if (weight == "0" || height == "0") {
      Alert.alert("คำเตือน", "กรุณาป้อนค่าน้ำหนักและส่วนสูงไม่เป็น 0");
      return;
    }

    //คำนวณ BMI = น้ำหนัก(กก.) / (ส่วนสูง(ม.) * ส่วนสูง(ม.))
    let heightValue = parseFloat(height) / 100; //แปลง cm เป็น m
    let weightValue = parseFloat(weight);
    let bmiValue = weightValue / (heightValue * heightValue);
    setResult(bmiValue.toFixed(2)); //แสดงผลลัพธ์ 2 ตำแหน่งทศนิยม

    //แปรผล BMI
    if (bmiValue < 18.5) {
      setResultText("ผอม");
    } else if (bmiValue < 23) {
      setResultText("ปกติ");
    } else if (bmiValue < 25) {
      setResultText("อ้วนเล็กน้อย");
    } else if (bmiValue < 30) {
      setResultText("อ้วนระดับ 1");
    } else {
      setResultText("อ้วนระดับ 2");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {/* ส่วนของการแสดงรูปโลโก้ */}
        <Image
          source={require("@/assets/images/bmilogo.png")}
          style={styles.imgLogo}
        />

        {/* ส่วนของการป้อนข้อมูล และปุ่มต่างๆ */}
        <View style={styles.cardInput}>
          <Text style={styles.labelInput}>ป้อนน้ำหนัก (kg)</Text>
          <TextInput
            style={styles.textInput}
            keyboardType="numeric"
            value={weight}
            onChangeText={setWeight}
          />
          <View style={{ height: 15 }} />
          <Text style={styles.labelInput}>ป้อนส่วนสูง (cm)</Text>
          <TextInput
            style={styles.textInput}
            keyboardType="numeric"
            value={height}
            onChangeText={setHeight}
          />

          {/* ส่วนของปุ่ม รีเซ็ต และคำนวณ */}
          <View style={{ flexDirection: "row", marginTop: 30, gap: 20 }}>
            <TouchableOpacity
              style={styles.btnReset}
              onPress={handleResetPress}
            >
              <Text style={styles.textBtn}>รีเซ็ต</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnCalculate}
              onPress={handleCalPress}
            >
              <Text style={styles.textBtn}>คำนวณ</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ส่วนของการแสดงผล */}
        <View style={styles.cardResult}>
          <Text
            style={{
              fontSize: 20,
              fontFamily: "Kanit_700Bold",
              color: "#ffffff",
            }}
          >
            BMI
          </Text>
          <Text
            style={{
              fontSize: 40,
              fontFamily: "Kanit_700Bold",
              color: "#fd6030",
            }}
          >
            {result}
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontFamily: "Kanit_700Bold",
              color: "#ffffff",
            }}
          >
            {resultText}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  cardResult: {
    //borderWidth: 1,
    width: "80%",
    marginTop: 25,
    alignItems: "center",
    backgroundColor: "#fe9474",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.25,
  },
  textBtn: {
    fontFamily: "Kanit_700Bold",
    fontSize: 16,
    color: "#ffffff",
  },
  btnCalculate: {
    flex: 2,
    //borderWidth: 1,
    padding: 15,
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: "#00ff00",
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.25,
  },
  btnReset: {
    flex: 1,
    //borderWidth: 1,
    padding: 15,
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: "#ff0000",
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.25,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#868585",
    padding: 13,
    borderRadius: 8,
  },
  labelInput: {
    fontFamily: "Kanit_400Regular",
    fontSize: 16,
    color: "#3c3a3a",
  },
  cardInput: {
    backgroundColor: "#e3e3e3",
    width: "80%",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.25,
    marginTop: 40,
  },
  imgLogo: { width: 120, height: 120, marginTop: 40 },
  container: {
    flex: 1,
    alignItems: "center", // จัดกึ่งกลางแนวแนวนอน
  },
});
