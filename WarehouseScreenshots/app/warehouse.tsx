import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Image,
    FlatList,
    StyleSheet,
    Platform,
} from 'react-native';
import * as MediaLibrary from 'expo-media-library';

type Screenshot = {
    uri: string;
    date: string;
};

export default function WarehouseScreen() {
    const [screenshots, setScreenshots] = useState<Screenshot[]>([]);
    const [hasPermission, setHasPermission] = useState(false);

    useEffect(() => {
        (async () => {
            const { status } = await MediaLibrary.requestPermissionsAsync();
            if (status !== 'granted') {
                setHasPermission(false);
                return;
            }

            setHasPermission(true);

            const assets = await MediaLibrary.getAssetsAsync({
                mediaType: 'photo',
                first: 30,
                sortBy: 'creationTime',
            });

            const filtered = assets.assets
                .filter(asset =>
                    asset.filename.toLowerCase().includes('screenshot') ||
                    asset.uri.includes('screenshot')
                )
                .slice(0, 15)
                .map(asset => ({
                    uri: asset.uri,
                    date: new Date(asset.creationTime || Date.now()).toLocaleString('uk-UA'),
                }));

            setScreenshots(filtered);
        })();
    }, []);

    const renderItem = ({ item }: { item: Screenshot }) => (
        <View style={styles.item}>
            <Image source={{ uri: item.uri }} style={styles.image} />
            <Text style={styles.date}>{item.date}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Склад скріншотів</Text>
            <Text style={styles.subtitle}>
                {hasPermission
                    ? `Знайдено ${screenshots.length} скріншотів`
                    : 'Дозвольте доступ до галереї'}
            </Text>

            <FlatList
                data={screenshots}
                renderItem={renderItem}
                keyExtractor={(_, i) => i.toString()}
                ListEmptyComponent={
                    <Text style={styles.empty}>Скріншотів не знайдено</Text>
                }
                contentContainerStyle={styles.list}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        paddingTop: Platform.OS === 'web' ? 60 : 50,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        marginVertical: 20,
    },
    subtitle: {
        fontSize: 16,
        color: '#aaa',
        textAlign: 'center',
        marginBottom: 20,
    },
    list: { paddingHorizontal: 10 },
    item: { marginBottom: 20, alignItems: 'center' },
    image: {
        width: '100%',
        height: 500,
        borderRadius: 16,
        backgroundColor: '#222',
    },
    date: { color: '#fff', marginTop: 8, fontSize: 14 },
    empty: { color: '#888', textAlign: 'center', marginTop: 60, fontSize: 18 },
});