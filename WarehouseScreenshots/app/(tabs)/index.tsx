import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    ScrollView,
    Platform,
} from 'react-native';
import { useRouter } from 'expo-router';

type Task = {
    id: string;
    title: string;
    subtitle: string;
    completed: boolean;
};

export default function HomeScreen() {
    const router = useRouter();
    const [tasks, setTasks] = useState<Task[]>([
        {
            id: '1',
            title: 'Перевір фургон',
            subtitle: 'Скануй QR з інвентаризацією перед стартом.',
            completed: false,
        },
        {
            id: '2',
            title: 'Забір зерна',
            subtitle: 'Змоделюй чек-ін у постачальника (локальний state).',
            completed: false,
        },
        {
            id: '3',
            title: 'Маршрут NextDrop',
            subtitle: 'Створи геоточки та дотримуйся роботи з картами.',
            completed: false,
        },
        {
            id: '4',
            title: 'Чек-ліст видачі',
            subtitle: 'Залиш підтвердження підпису клієнта (Gesture Handler).',
            completed: false,
        },
    ]);

    const toggleTask = (id: string) => {
        setTasks(prev =>
            prev.map(task =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    const completedCount = tasks.filter(t => t.completed).length;

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Маршрут дня</Text>
            <Text style={styles.counter}>
                Виконано: {completedCount} з {tasks.length}
            </Text>

            <ScrollView style={styles.list}>
                {tasks.map(task => (
                    <Pressable
                        key={task.id}
                        style={[styles.taskCard, task.completed && styles.taskCompleted]}
                        onPress={() => toggleTask(task.id)}
                    >
                        <View style={styles.radio}>
                            <View
                                style={[
                                    styles.radioOuter,
                                    task.completed && styles.radioFilled,
                                ]}
                            >
                                {task.completed && <View style={styles.radioInner} />}
                            </View>
                        </View>

                        <View style={styles.taskText}>
                            <Text
                                style={[
                                    styles.taskTitle,
                                    task.completed && styles.textCompleted,
                                ]}
                            >
                                {task.title}
                            </Text>
                            <Text
                                style={[
                                    styles.taskSubtitle,
                                    task.completed && styles.textCompleted,
                                ]}
                            >
                                {task.subtitle}
                            </Text>
                        </View>
                    </Pressable>
                ))}
            </ScrollView>

            <Pressable style={styles.button} onPress={() => router.push('/warehouse')}>
                <Text style={styles.buttonText}>Перейти на Склад скрінів</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingTop: Platform.OS === 'web' ? 60 : 50,
    },
    header: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        color: '#333',
    },
    counter: {
        fontSize: 18,
        textAlign: 'center',
        color: '#666',
        marginBottom: 30,
    },
    list: {
        flex: 1,
        paddingHorizontal: 20,
    },
    taskCard: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    taskCompleted: {
        opacity: 0.7,
        backgroundColor: '#e8f5e8',
    },
    radio: {
        justifyContent: 'center',
        marginRight: 16,
    },
    radioOuter: {
        width: 28,
        height: 28,
        borderRadius: 14,
        borderWidth: 3,
        borderColor: '#007AFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    radioFilled: {
        borderColor: '#34C759',
    },
    radioInner: {
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: '#34C759',
    },
    taskText: {
        flex: 1,
        justifyContent: 'center',
    },
    taskTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    taskSubtitle: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    textCompleted: {
        textDecorationLine: 'line-through',
        color: '#888',
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        margin: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});