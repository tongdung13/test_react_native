import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const Blog = ({navigation}) => {
  const [token, setToken] = useState('');
  const [blogs, setBlogs] = useState([]);
  AsyncStorage.getItem('AccessToken').then(value => {
    setToken(value);
  });

  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    // cu phap co dau cach dang sau Bearer
    Authorization: 'Bearer ' + token,
  };

  
  axios
    .get('http://103.226.249.210:3022/api/blogs', {headers})
    .then(response => {
      setBlogs(response.data.data);
    })
    .catch(function (error) {
      alert(error);
    });
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Blog Screen</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
        style={styles.button}>
        <Text style={styles.submit}>Quay lai</Text>
      </TouchableOpacity>
      <ScrollView>
        {blogs.map((blog, index) => {
          return (
            <View style={styles.blog}>
              <Text key={index + 1}>{blog.title}</Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 30,
    color: 'red',
  },
  blog: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
});

export default Blog;
