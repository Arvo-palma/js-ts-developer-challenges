import { api } from '../core/libs/axios';
import { MACHINE_PATH } from '../machine/actions';
import {
  MachineType,
  MonitoringPointType,
} from '../machine/types/machine-type';

export const POINTS_PATH = 'by-monitoring-points';
export const DELETE_POINT_PATH = 'delete-point';

export async function getAllMonitoringPoints(userId: string) {
  const response = await api.get(`${MACHINE_PATH}/${POINTS_PATH}/${userId}`);

  return response.data;
}

type CreateMonitoringPointParams = {
  machine: MachineType;
  point: MonitoringPointType;
};
export const createMonitoringPoint = async ({
  machine,
  point,
}: CreateMonitoringPointParams) => {
  const currentPoints =
    machine?.monitoringPoints && machine?.monitoringPoints?.length > 0
      ? machine?.monitoringPoints
      : [];
  const machineWithPoint = {
    ...machine,
    monitoringPoints: [...currentPoints, point],
  };
  const { data } = await api.put(
    `${MACHINE_PATH}/${machine._id}`,
    machineWithPoint
  );

  return data;
};

export async function deleteMonitoringPointAction(params: {
  machineId: string;
  pointId: string;
}) {
  const response = await api.put(
    `${MACHINE_PATH}/${DELETE_POINT_PATH}/${params.machineId}`,
    { monitoringPointId: params.pointId }
  );

  return response.data;
}
