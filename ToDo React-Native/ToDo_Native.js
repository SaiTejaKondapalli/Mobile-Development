import React from 'react';
import {
  View,
  TextInput,
  Text,
  Button,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import Constants from 'expo-constants';
import DatePicker from 'react-native-datepicker';

class TaskComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      date: ''
      // complete : false
    };
  }
  render() {
    const tasks = this.props.tasks.map((task, i) => {
      return (
        <View style={{ flexDirection: 'row', marginTop: 10 }}>
          <Text
            style={{
              backgroundColor: task.complete ? 'green' : '',
              textDecorationStyle: 'solid',
              padding: 10,
            }}>
            {task.name}
          </Text>
          <Text style={{ padding: 10}}>{task.date}</Text>
          <TouchableHighlight
            style={{
              backgroundColor: 'grey',
              width: 100,
              height: 40,
              alignItems: 'center',
              padding: 10,
            }}
            onPress={() => this.taskDone(i)}>
            <Text>Done</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={{
              backgroundColor: 'grey',
              width: 100,
              height: 40,
              alignItems: 'center',
              padding: 10,
            }}
            onPress={() => this.deleteTask(i)}>
            <Text>Delete</Text>
          </TouchableHighlight>
        </View>
      );
    });
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          {tasks}
          <TextInput
            style={{ borderColor: 'gray', borderWidth: 1 }}
            onChangeText={this.handleChange}
            placeholder="Enter a task"
            value={this.state.value}
          />
          <DatePicker
            style={{ width: 200, marginLeft: 75 }}
            minDate={new Date()}
            format="MMMM D, YYYY"
            date={this.state.date}
            placeholder="Select Due Date"
            duration={10}
            onDateChange={this.handleDateChange}
            customStyles={{
              placeholderText: {
                fontSize: 15,
                color: '#234456',
              },
            }}
          />
          <Button title="Add Task" onPress={this.handleSubmit} />
        </ScrollView>
      </View>
    );
  }
  // addTask = () => {
  //   this.props.addTask(this.state.value);
  //   this.setState({
  //     value: '',
  //     date : ''
  //   });
  // };

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
    this.props.addTask(this.state.value, this.state.date);
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
    };
  }
  render() {
    return (
      <View style={{ marginTop: Constants.statusBarHeight, flex: 1 }}>
        <Text style={{ fontSize: 20, marginLeft: 125, color: 'red' }}>
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
