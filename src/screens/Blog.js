
import { S3Image } from 'aws-amplify-react-native';
import React from 'react';
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
  blog_api()
    .then(response => {
      this.blogs = response.data.data;
      // console.log(blogs);
    })
    .catch(error => {
      console.error(error);
    });
    // if (Array.isArray(this.blogs)) {
    //   console.log('------ true -----');
    // } else {
    //   console.log('------ false -----');
    // }
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
        {Array.isArray(this.blogs) && this.blogs.map((data, index) => {
          return (
            <DataTable.Row style={styles.row} key={index}>
              <DataTable.Cell>
                <Text style={styles.data}>
                  {data.title}
                </Text>
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
    width: 10,
  },
});

export default Blog;
