import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {blog_detail} from './blog_api';

export const BlogDetail = ({route, navigation}) => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    const id = route.params;
    blog_detail(id)
      .then(response => {
        setBlogs(response.data.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  return (
    (
      <View style={styles.header}>
        <Text style={styles.title}>Blog Detail</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Blog')}>
          <Text style={styles.button}>Tro ve</Text>
        </TouchableOpacity>
      </View>
    ),
    (
      <View>
        <Image style={styles.image} source={{uri: blogs.image}} />
      </View>
    )
  );
};

const styles = StyleSheet.create({
  header: {
    textAlign: 'center',
    alignItems: 'center',
    backgroundColor: '#CCFFFF',
  },
  title: {
    fontSize: 30,
    color: 'red',
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 80,
  },
});
