import React from 'react';
import { Alert, Text, TextInput, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

const EmployeeSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  position: Yup.string().required('Position is required'),
  phone: Yup.string().required('Phone is required'),
  department: Yup.string().required('Department is required'),
});

export default function EmployeeFormScreen() {
  return (
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
        <View style={styles.screen}>
          <View style={styles.formBox}>
            <TextInput
              placeholder="Name"
              onChangeText={handleChange('name')}
              value={values.name}
              style={styles.input}
            />
            {touched.name && errors.name && <Text style={styles.error}>{errors.name}</Text>}

            <TextInput
              placeholder="Email"
              onChangeText={handleChange('email')}
              value={values.email}
              style={styles.input}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}

            <TextInput
              placeholder="Position"
              onChangeText={handleChange('position')}
              value={values.position}
              style={styles.input}
            />
            {touched.position && errors.position && <Text style={styles.error}>{errors.position}</Text>}

            <TextInput
              placeholder="Phone"
              onChangeText={handleChange('phone')}
              value={values.phone}
              style={styles.input}
              keyboardType="phone-pad"
            />
            {touched.phone && errors.phone && <Text style={styles.error}>{errors.phone}</Text>}

            <TextInput
              placeholder="Department"
              onChangeText={handleChange('department')}
              value={values.department}
              style={styles.input}
            />
            {touched.department && errors.department && <Text style={styles.error}>{errors.department}</Text>}

            <TouchableOpacity style={styles.button} onPress={handleSubmit as () => void}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
  },
  formBox: {
    width: '90%',
    maxWidth: 400,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fefefe',
    padding: 12,
    marginBottom: 10,
    borderRadius: 6,
  },
  error: {
    color: 'red',
    marginBottom: 8,
    fontSize: 12,
  },
  button: {
    backgroundColor: '#4a90e2',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
