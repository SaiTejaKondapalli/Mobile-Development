import React from 'react';
import {
  View,
  TextInput,
  Text,
  Button,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Constants from 'expo-constants';
import DatePicker from 'react-native-datepicker';

class TaskComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      date: '',
    };
  }
  render() {
    const tasks = this.props.tasks.map((task, i) => {
      return (
        <View>
          <View>
            <Text
              style={{
                backgroundColor: task.complete ? 'green' : '',
                textDecorationStyle: 'solid',
                padding: 10,
                textAlign: 'center',
                color : "white"
              }}>
              {task.name}
            </Text>
            <Text style={{ padding: 10, textAlign: 'center',color:"white" }}>
              {task.date}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: 10,
              paddingLeft: 70,
            }}>
            <TouchableOpacity
              style={styles.buttonstyle}
              onPress={() => this.taskDone(i)}>
              <Text>Done</Text>
            </TouchableOpacity>
            <Text> </Text>
            <TouchableOpacity
              style={styles.buttonstyle}
              onPress={() => this.deleteTask(i)}>
              <Text>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    });
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          {tasks}
          <TextInput
            style={{ borderColor: 'gray', borderWidth: 1,color:"white" }}
            onChangeText={this.handleChange}
            placeholder="Enter a task"
            value={this.state.value}
          />
          <DatePicker
            style={{ width: 200, marginLeft: 100, padding: 10}}
            minDate={new Date()}
            format="MMMM D, YYYY"
            date={this.state.date}
            placeholder="Select Due Date"
            duration={10}
            onDateChange={this.handleDateChange}
            customStyles={{
              placeholderText: {
                fontSize: 15,
                color: "white",
              },
              dateText:{
                color : "white"
              }
            }}
          />
          <Button title="Add Task" onPress={this.handleSubmit} />
        </ScrollView>
      </View>
    );
  }

  deleteTask = i => {
    this.props.deleteTask(i);
  };

  taskDone = i => {
    this.props.taskDone(i);
  };

  handleChange = text => {
    this.setState({
      value: text,
    });
  };

  handleDateChange = date => {
    this.setState({
      date: date,
    });
  };

  handleSubmit = () => {
    this.props.addTask(this.state.value, this.state.date, false);
    this.setState({
      value: '',
      date: '',
    });
  };
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      complete: false,
    };
  }
  render() {
    return (
      <View style={{ marginTop: Constants.statusBarHeight, flex: 1, backgroundColor:"black" }}>
        <Text style={{ fontSize: 30, textAlign: 'center', color: 'red', fontWeight :"bold", paddingTop : 20 }}>
          ToDo List
        </Text>
        <TaskComponent
          tasks={this.state.tasks}
          addTask={this.addTask}
          deleteTask={this.deleteTask}
          taskDone={this.taskDone}
        />
      </View>
    );
  }
  addTask = (name, date) => {
    // complete : false
    this.setState(state => ({
      tasks: [...state.tasks, { name, date }],
    }));
  };

  deleteTask = index => {
    this.setState(state => {
      const tasks = [...state.tasks];
      tasks.splice(index, 1);
      return { tasks };
    });
  };

  taskDone = index => {
    this.setState(state => {
      const tasks = [...state.tasks];
      tasks[index].complete = !tasks[index].complete;
      return { tasks };
    });
  };
}
const styles = StyleSheet.create({
  buttonstyle: {
    backgroundColor: 'grey',
    width: 100,
    height: 40,
    alignItems: 'center',
    padding: 10,
  },
});
