import {S3Image} from 'aws-amplify-react-native';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {DataTable} from 'react-native-paper';
import {blog_api} from './blog_api';

const Blog = ({navigation}) => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    blog_api()
      .then(response => {
        if (response.data.code == 200) {
          const data = response.data.data;
          setBlogs(data);
        } else {
          alert(response.data.message);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.header}>Blog Screen</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          style={styles.button}>
          <Text style={styles.submit}>Quay lai</Text>
        </TouchableOpacity>
      </View>
      {Array.isArray(blogs) &&
        blogs.map((data, index) => {
          return (
            <TouchableOpacity onPress={() => navigation.navigate('BlogDetail', {id: data.id})}>
              <View style={styles.row} key={index}>
                <Image style={styles.image} source={{uri: data.image}} />
                <Text style={styles.title1}>{data.title}</Text>
                <Text style={styles.content}>{data.content}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
    </View>
  );
};

styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 30,
    color: 'red',
  },
  blog: {
    width: 350,
  },
  table: {
    padding: 15,
  },
  headers: {
    backgroundColor: '#6699FF',
  },
  title: {
    textAlign: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'column',
    height: 100,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 8,
    backgroundColor: '#CCFFFF',
  },
  data: {
    fontSize: 16,
    color: '#99CC33',
    whiteSpace: 'pre-line',
  },
  image: {
    width: 100,
    height: 100,
  },
  title1: {
    position: 'absolute',
    left: 120,
    top: 8,
    fontSize: 20,
    color: 'black',
  },
  content: {
    position: 'absolute',
    left: 130,
    top: 35,
  },
});

export default Blog;
