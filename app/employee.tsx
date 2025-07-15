import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Formik } from 'formik';
import React from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as Yup from 'yup';

const EmployeeSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  position: Yup.string().required('Position is required'),
  phone: Yup.string().required('Phone is required'),
  department: Yup.string().required('Department is required'),
});

export default function EmployeeFormScreen() {
  const router = useRouter();

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Employee Information</Text>

      <Formik
        initialValues={{
          name: '',
          email: '',
          position: '',
          phone: '',
          department: '',
        }}
        validationSchema={EmployeeSchema}
        onSubmit={(values, { resetForm }) => {
          console.log('Employee Info:', values);
          Alert.alert('Success', 'Employee data submitted!');
          resetForm();
        }}
      >
        {({ handleChange, handleSubmit, values, errors, touched }) => (
          <View style={styles.formBox}>
            
            <View style={styles.inputContainer}>
              <Ionicons name="person-outline" size={20} color="#4a90e2" style={styles.icon} />
              <TextInput
                placeholder="Name"
                onChangeText={handleChange('name')}
                value={values.name}
                style={styles.input}
              />
            </View>
            {touched.name && errors.name && <Text style={styles.error}>{errors.name}</Text>}

            <View style={styles.inputContainer}>
              <Ionicons name="mail-outline" size={20} color="#4a90e2" style={styles.icon} />
              <TextInput
                placeholder="Email"
                onChangeText={handleChange('email')}
                value={values.email}
                style={styles.input}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>
            {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}

            <View style={styles.inputContainer}>
              <Ionicons name="briefcase-outline" size={20} color="#4a90e2" style={styles.icon} />
              <TextInput
                placeholder="Position"
                onChangeText={handleChange('position')}
                value={values.position}
                style={styles.input}
              />
            </View>
            {touched.position && errors.position && <Text style={styles.error}>{errors.position}</Text>}

            <View style={styles.inputContainer}>
              <Ionicons name="call-outline" size={20} color="#4a90e2" style={styles.icon} />
              <TextInput
                placeholder="Phone"
                onChangeText={handleChange('phone')}
                value={values.phone}
                style={styles.input}
                keyboardType="phone-pad"
              />
            </View>
            {touched.phone && errors.phone && <Text style={styles.error}>{errors.phone}</Text>}

            <View style={styles.inputContainer}>
              <Ionicons name="business-outline" size={20} color="#4a90e2" style={styles.icon} />
              <TextInput
                placeholder="Department"
                onChangeText={handleChange('department')}
                value={values.department}
                style={styles.input}
              />
            </View>
            {touched.department && errors.department && <Text style={styles.error}>{errors.department}</Text>}

            <TouchableOpacity style={styles.button} onPress={handleSubmit as () => void}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.secondaryButton} onPress={() => router.replace('/')}>
              <Text style={styles.secondaryButtonText}>Go to Sign In</Text>
            </TouchableOpacity>

          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    paddingTop: 60,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4a90e2',
    marginBottom: 20,
  },
  formBox: {
    width: '90%',
    maxWidth: 400,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    borderWidth: 2,
    borderColor: '#4a90e2',
    elevation: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fefefe',
    borderRadius: 6,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
  },
  error: {
    color: 'red',
    marginBottom: 8,
    fontSize: 12,
  },
  button: {
    backgroundColor: '#4a90e2',
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
link: {
    marginTop: 12,
    fontSize: 16,
    color: '#4a90e2',
    textAlign: 'center',
  },
secondaryButton: {
  backgroundColor: '#35e5a1ff',
  paddingVertical: 14,
  paddingHorizontal: 16,
  borderRadius: 6,
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  marginTop: 10,
},secondaryButtonText: {
  color: '#ffffff',
  fontSize: 16,
  fontWeight: '600',
},
});
