import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
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
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.button}>
          {/* <Icon name='left' /> */}
        </TouchableOpacity>
        <Text style={styles.header}>Blog Screen</Text>
      </View>
      {Array.isArray(blogs) &&
        blogs.map((data, index) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate('BlogDetail', {id: data.id})}
              key={index}>
              <View style={styles.row}>
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
    color: 'white',
    textAlign: 'center',
    alignItems: 'center',
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
    backgroundColor: '#FF0000',
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
