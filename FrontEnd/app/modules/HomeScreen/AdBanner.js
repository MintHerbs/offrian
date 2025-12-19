import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import AdButton from '../../components/buttons/AdButton';

// Your SVG Imports
import SelectedIcon from '../../assets/navigation/Selected.svg';
import NotSelectedIcon from '../../assets/navigation/NotSelected.svg';

import cover1 from '../../assets/cover/cover1.png';
import cover2 from '../../assets/cover/cover2.png';
import cover3 from '../../assets/cover/cover3.png';
import cover4 from '../../assets/cover/cover4.png';

const covers = [cover1, cover2, cover3, cover4];

function AdBanner({ handleSubmit, width = '90%', height = 180, margin = 20 }) { 
    const [containerWidth, setContainerWidth] = useState(0);
    const [active, setActive] = useState(0); 

    const onLayout = (event) => {
        setContainerWidth(event.nativeEvent.layout.width);
    };

    // Calculate index when scroll stops
    const handleScroll = (event) => {
        const scrollOffset = event.nativeEvent.contentOffset.x;
        const currentIndex = Math.round(scrollOffset / containerWidth);
        setActive(currentIndex);
    };

    // Function to split text at approximate halfway point
    const renderSubtitle = () => {
        const fullText = "Lorem Ipsum is simply dummy text of the printing.";
        if (containerWidth > 0) {
            // Account for padding in the container
            const effectiveWidth = containerWidth - 40; // Subtract padding (20px each side)
            
            // Find the best place to split (near the middle, but at a space)
            const midPoint = Math.floor(fullText.length / 2);
            
            // Look for the nearest space before the midpoint
            let breakIndex = midPoint;
            for (let i = midPoint; i >= 0; i--) {
                if (fullText[i] === ' ') {
                    breakIndex = i;
                    break;
                }
            }
            
            // Look for the nearest space after the midpoint if no space was found before
            if (breakIndex === midPoint) {
                for (let i = midPoint; i < fullText.length; i++) {
                    if (fullText[i] === ' ') {
                        breakIndex = i;
                        break;
                    }
                }
            }
            
            const firstPart = fullText.substring(0, breakIndex).trim();
            const secondPart = fullText.substring(breakIndex).trim();
            
            return (
                <>
                    <Text style={styles.subtitle}>{firstPart}</Text>
                    <Text style={styles.subtitle}>{secondPart}</Text>
                </>
            );
        }
        
        // Fallback without splitting
        return <Text style={styles.subtitle}>{fullText}</Text>;
    };

    return (
        <View style={[styles.container, { width, height, margin }]} onLayout={onLayout}> 
            
            {/* BACKGROUND LAYER */}
            <ScrollView 
                horizontal 
                pagingEnabled 
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={handleScroll} // Updates the dots after swipe
                scrollEventThrottle={16}
                style={StyleSheet.absoluteFill}
            >
                {covers.map((img, index) => (
                    <Image 
                        key={index} 
                        source={img} 
                        style={{ width: containerWidth, height: '100%' }} 
                        resizeMode="cover"
                    />
                ))}
            </ScrollView>

            {/* CONTENT LAYER */}
            <View style={styles.overlay} pointerEvents="box-none">
                <View style={styles.contentTop}>
                    <View style={styles.textContainer} pointerEvents="none">
                        <Text style={styles.header} numberOfLines={1} adjustsFontSizeToFit>
                            Medical Check!
                        </Text>
                        {renderSubtitle()}
                    </View>
                    
                    {/* Button container aligned with text */}
                    <View style={styles.buttonContainer}>
                        <View style={styles.buttonWrapper}>
                            <AdButton title="Check Now" onPress={handleSubmit} />
                        </View>
                    </View>
                </View>

                {/* PAGINATION INDICATORS */}
                <View style={styles.pagination}>
                    {covers.map((_, index) => (
                        <View key={index} style={styles.iconContainer}>
                            {index === active ? (
                                <SelectedIcon width={25} height={7} />
                            ) : (
                                <NotSelectedIcon width={7} height={7} />
                            )}
                        </View>
                    ))}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 30,
        overflow: 'hidden',
        backgroundColor: '#417FFF',
        
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        padding: 20,
        justifyContent: 'space-between', 
        flexDirection: 'column',
    },
    contentTop: {
        flex: 1,
        justifyContent: 'flex-start', 
    },
    textContainer: {
        marginBottom: 8, 
    },
    buttonContainer: {
        width: '35%', 
    },

    buttonWrapper: {
        marginVertical: 40, 
    },
    header: { fontSize: 25, fontWeight: 'bold', color: '#FFFFFF' },
    subtitle: { fontSize: 14, color: '#FFFFFF', marginTop: 5 },
    
    // Pagination Styles
    pagination: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center', // Centers pagination dots horizontally
        marginTop: 3, // Space above pagination
        marginBottom: 2, // Space below pagination (affects total height)
    },
    iconContainer: {
        marginHorizontal: -3,
        justifyContent: 'center',
        alignItems: 'center',
        width: 27,
    },
});

export default AdBanner;