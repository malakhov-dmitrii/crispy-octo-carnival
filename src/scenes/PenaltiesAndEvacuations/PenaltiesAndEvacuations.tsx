import React from 'react';
import Title from 'antd/lib/typography/Title';
import ListViolationsCard from './components/ListViolationsCard';

const penaltiesData = [
  {
    id: 1,
    icon: 'car',
    numberCar: 'А123УХ77',
    text: 'Штраф по административному правонарушению постановление №18810177181044064881 от 13.10.2018',
    paid: true,
    paidDate: new Date(),
    price: 540000,
  },
  {
    id: 2,
    icon: 'truck',
    numberCar: 'А123УХ77',
    text: 'Штраф по административному правонарушению постановление №18810177181044064881 от 13.10.2018',
    paid: false,
    initialPrice: 720000,
    price: 540000,
  },
  {
    id: 3,
    icon: 'bus',
    numberCar: 'А123УХ77',
    text: 'Штраф по административному правонарушению постановление №18810177181044064881 от 13.10.2018',
    paid: false,
    initialPrice: 720000,
    price: 540000,
  },
  {
    id: 4,
    icon: 'car',
    numberCar: 'А123УХ77',
    text: 'Штраф по административному правонарушению постановление №18810177181044064881 от 13.10.2018',
    paid: true,
    paidDate: new Date(),
    price: 540000,
  },
  {
    id: 5,
    icon: 'car',
    numberCar: 'А123УХ77',
    text: 'Штраф по административному правонарушению постановление №18810177181044064881 от 13.10.2018',
    paid: true,
    paidDate: new Date(),
    price: 540000,
  },
  {
    id: 6,
    icon: 'car',
    numberCar: 'А123УХ77',
    text: 'Штраф по административному правонарушению постановление №18810177181044064881 от 13.10.2018',
    paid: true,
    paidDate: new Date(),
    price: 540000,
  },
  {
    id: 7,
    icon: 'truck',
    numberCar: 'А123УХ77',
    text: 'Штраф по административному правонарушению постановление №18810177181044064881 от 13.10.2018',
    paid: false,
    initialPrice: 720000,
    price: 540000,
  },
  {
    id: 8,
    icon: 'bus',
    numberCar: 'А123УХ77',
    text: 'Штраф по административному правонарушению постановление №18810177181044064881 от 13.10.2018',
    paid: false,
    initialPrice: 720000,
    price: 540000,
  },
];

const evacuationsData = [
  {
    id: 1,
    icon: 'car',
    numberCar: 'А123УХ77',
    text: 'Эвакуирован 13.10.2018',
    paid: true,
    paidDate: new Date(),
    price: 540000,
  },
  {
    id: 2,
    icon: 'truck',
    numberCar: 'А123УХ77',
    text: 'Эвакуирован 13.10.2018',
    paid: false,
    initialPrice: 720000,
    price: 540000,
  },
  {
    id: 3,
    icon: 'bus',
    numberCar: 'А123УХ77',
    text: 'Эвакуирован 13.10.2018',
    paid: false,
    initialPrice: 720000,
    price: 540000,
  },
];

const PenaltiesAndEvacuations = () => {
  return (
    <>
      <Title>Штрафы и эвакуации</Title>
      <ListViolationsCard type="evacuation" items={evacuationsData} />
      <ListViolationsCard type="penalty" items={penaltiesData} />
    </>
  );
};

export default PenaltiesAndEvacuations;
