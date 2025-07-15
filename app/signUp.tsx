import React from 'react';
import { Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'expo-router';

const SignUpSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password too short').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
});

export default function SignUpScreen() {
  const router = useRouter();

  return (
    <Formik
      initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
      validationSchema={SignUpSchema}
      onSubmit={(values) => {
        console.log('Sign Up:', values);
        router.replace('/');
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
              placeholder="Password"
              secureTextEntry
              onChangeText={handleChange('password')}
              value={values.password}
              style={styles.input}
            />
            {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}

            <TextInput
              placeholder="Confirm Password"
              secureTextEntry
              onChangeText={handleChange('confirmPassword')}
              value={values.confirmPassword}
              style={styles.input}
            />
            {touched.confirmPassword && errors.confirmPassword && (
              <Text style={styles.error}>{errors.confirmPassword}</Text>
            )}

            <TouchableOpacity style={styles.button} onPress={handleSubmit as () => void}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.secondaryButton} onPress={() => router.push('/')}>
              <Text style={styles.secondaryButtonText}>Sign In</Text>
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
  borderWidth: 2,
  borderColor: '#4a90e2',
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
},
secondaryButtonText: {
  color: '#ffffff',
  fontSize: 16,
  fontWeight: '600',
},
});
