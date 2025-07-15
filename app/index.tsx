import React from 'react';
import { Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'expo-router';

const SignInSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password too short').required('Password is required'),
});

export default function SignInScreen() {
  const router = useRouter();

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={SignInSchema}
      onSubmit={(values) => {
        console.log('Sign In:', values);
        router.replace('/employee');
      }}
    >
      {({ handleChange, handleSubmit, values, errors, touched }) => (
        <View style={styles.screen}>
          <View style={styles.formBox}>
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

            <TouchableOpacity style={styles.button} onPress={handleSubmit as () => void}>
              <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.secondaryButton} onPress={() => router.push('/signUp')}>
              <Text style={styles.secondaryButtonText}>Sign Up</Text>
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
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
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
