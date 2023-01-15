import {S3Image} from 'aws-amplify-react-native';
import React, {useEffect, useState} from 'react';
import {
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
      <Text style={styles.header}>Blog Screen</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
        style={styles.button}>
        <Text style={styles.submit}>Quay lai</Text>
      </TouchableOpacity>
      <DataTable style={styles.table}>
        <DataTable.Header style={styles.headers}>
          <DataTable.Title>
            <Text style={styles.title}>Title</Text>
          </DataTable.Title>
          <DataTable.Title>
            <Text style={styles.title}>Content</Text>
          </DataTable.Title>
          <DataTable.Title>
            <Text style={styles.title}>Image</Text>{' '}
          </DataTable.Title>
        </DataTable.Header>
        {Array.isArray(blogs) &&
          blogs.map((data, index) => {
            return (
              <DataTable.Row style={styles.row} key={index}>
                <DataTable.Cell>
                  <Text style={styles.data}>{data.title}</Text>
                </DataTable.Cell>
                <DataTable.Cell>
                  <Text style={styles.data}>{data.content}</Text>
                </DataTable.Cell>
                <DataTable.Cell>
                  <Image source={{uri: data.image}} style={styles.image} />
                </DataTable.Cell>
              </DataTable.Row>
            );
          })}
      </DataTable>
    </View>
  );
};

styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: 'center',
    alignItems: 'center',
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
    fontSize: 18,
    color: 'red',
  },
  row: {
    borderWidth: 1,
  },
  data: {
    fontSize: 16,
    color: '#99CC33',
  },
  image: {
    width: 50,
    height: 40,
  },
});

export default Blog;
