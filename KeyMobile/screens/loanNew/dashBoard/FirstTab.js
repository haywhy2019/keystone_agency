import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { HistoryCard } from '../../../components';

const transactionData = [
    {
      ref: "oguns segunl",
      amount: "10,000",
      detail: "Salary payment for march",
      date: "20 November 2020",
    },
    {
      ref: "Ogunsola segun",
      amount: "10,000",
      detail: "Salary payment for march",
      date: "20 November 2020",
    },
    {
      ref: "Ogunsola segun",
      amount: "10,000",
      detail: "Salary payment for march",
      date: "20 November 2020",
    },
    {
      ref: "Ogunsola segun",
      amount: "10,000",
      detail: "Salary payment for march",
      date: "20 November 2020",
    },
    {
      ref: "Ogunsola segun",
      amount: "10,000",
      detail: "Salary payment for march",
      date: "20 November 2020",
    },
    {
      ref: "Ogunsola segun",
      amount: "10,000",
      detail: "Salary payment for march",
      date: "20 November 2020",
    },
    {
      ref: "Ogunsola segun",
      amount: "10,000",
      detail: "Salary payment for march",
      date: "20 November 2020",
    }
  ];

const FirstTab = () => {
  return (
    <View style={{ marginTop: 20 }}>
      {transactionData.map((item, index) => (
        <HistoryCard item={item} key={index} />
      ))}
    </View>
  )
}

export default FirstTab

const styles = StyleSheet.create({})