import React, { useState } from 'react';

import { FiPower, FiClock } from 'react-icons/fi';
import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  NextAppointment,
  Section,
  Appointment,
  Calendar,
} from './styles';

import { useAuth } from '../../hooks/AuthContext';

import logoImg from '../../assets/logo.svg';

const Dashboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const { signOut, user } = useAuth();

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="GoBarber logo." />

          <Profile>
            <img src={user.avatar_url} alt={user.name} />

            <div>
              <span>Bem-vindo,</span>
              <strong>{`${user.name}.`}</strong>
            </div>
          </Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

      <Content>
        <Schedule>
          <h1>Horários agendados</h1>
          <p>
            <span>Hoje</span>
            <span>Dia 06</span>
            <span>Segunda-feira</span>
          </p>

          <NextAppointment>
            <strong>Próximo atendimento</strong>

            <div>
              <img
                src="https://avatars1.githubusercontent.com/u/17730232?s=460&u=9017dc28c6d94e59b900b716a8570cc6e04d520a&v=4"
                alt="Tairone Livinalli"
              />

              <strong>Tairone Livinalli</strong>
              <span>
                <FiClock />
                08:00
              </span>
            </div>
          </NextAppointment>

          <Section>
            <strong>Manhã</strong>

            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img
                  src="https://avatars1.githubusercontent.com/u/17730232?s=460&u=9017dc28c6d94e59b900b716a8570cc6e04d520a&v=4"
                  alt="Tairone Livinalli"
                />

                <strong>Tairone Livinalli</strong>
              </div>
            </Appointment>
            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img
                  src="https://avatars1.githubusercontent.com/u/17730232?s=460&u=9017dc28c6d94e59b900b716a8570cc6e04d520a&v=4"
                  alt="Tairone Livinalli"
                />

                <strong>Tairone Livinalli</strong>
              </div>
            </Appointment>
          </Section>

          <Section>
            <strong>Tarde</strong>
            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img
                  src="https://avatars1.githubusercontent.com/u/17730232?s=460&u=9017dc28c6d94e59b900b716a8570cc6e04d520a&v=4"
                  alt="Tairone Livinalli"
                />

                <strong>Tairone Livinalli</strong>
              </div>
            </Appointment>
          </Section>
        </Schedule>
        <Calendar />
      </Content>
    </Container>
  );
};

export default Dashboard;
