import { IPagination } from "@/types";
import { Get } from "@/utils/request";

const { VITE_DEPLOY_URL } = import.meta.env
interface IGetDeployListReturnType {
  dataSource: Array<{
    id: number
    config: string
    rootPath: string
    name: string
    shellCommand: string
    createTime: string
    updateTime: string
  }>,
  total: number
}

export function getDeployList<T extends IPagination>(params: T) {
  const { data } = Get<IGetDeployListReturnType>('deploy', params)
  return data
}

export function requestDeploy(id: number) {
  const { data } = Get(`${VITE_DEPLOY_URL}/deploy?id=${id}`)
  return data
}