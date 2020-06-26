## 部署应用

资源集中部署的应用，填写应用部署相关信息，提交后等待平台管理员审核。
非集中部署的应用直接进入下一步。

## 应用打包规范


应用以 Helm Chart 的形式上传部署到平台中。

### 准备 Helm 客户端工具

安装 Helm 客户端工具，若您的个人环境还没有安装 Helm 客户端工具，请参考 [Helm 安装文档](https://github.com/helm/helm/blob/master/docs/install.md#installing-the-helm-client)。

### 准备本地仓库

执行下列命令，在本地创建目录作为本地仓库。

```bash
$ mkdir helm-repo
$ cd helm-repo
```

### 创建应用

执行 `helm create` 创建一个名为 nginx 的文件夹且默认生成一个 nginx 基本的 yaml 文件模板和目录，通常情况下不建议修改生成的一级目录下文件和目录的命名。

```bash
$ helm create nginx
$ tree nginx/
nginx/
├── charts
├── Chart.yaml
├── templates
│   ├── deployment.yaml
│   ├── _helpers.tpl
│   ├── ingress.yaml
│   ├── NOTES.txt
│   └── service.yaml
└── values.yaml

2 directories, 7 files
```

Chart.yaml 是用于描述 Chart 的基本信息，包括名称、API 和应用版本等，其中 appVersion 字段与 version 字段无关。这是一种指定应用程序版本的方法详见 [Chart.yaml 文件](../helm-specification#chartyaml-文件)。

**Chart.yaml 文件示例：**

```yaml
apiVersion: v1
appVersion: "1.0"
description: A Helm chart for Kubernetes
name: nginx
version: 0.1.0
```

包含在 chart 内的默认 values 文件必须命名 values.yaml，可以为 chart 及其任何依赖项提供值。通过 values.yaml 文件提供的值可以从.Values模板中的对象访问。在部署 Helm Chart 类型的应用到 Kuberntes 运行环境时，支持在 UI 界面可以对 values.yaml 进行编辑配置。

**values.yaml：**

```yaml
# Default values for test.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

replicaCount: 1

image:
  repository: nginx
  tag: stable
  pullPolicy: IfNotPresent

nameOverride: ""
fullnameOverride: ""

service:
  type: ClusterIP
  port: 80

ingress:
  enabled: false
  annotations: {}
    # kubernetes.io/ingress.class: nginx
    # kubernetes.io/tls-acme: "true"
  path: /
  hosts:
    - chart-example.local
  tls: []
  #  - secretName: chart-example-tls
  #    hosts:
  #      - chart-example.local

resources: {}
  # We usually recommend not to specify default resources and to leave this as a conscious
  # choice for the user. This also increases chances charts run on environments with little
  # resources, such as Minikube. If you do want to specify resources, uncomment the following
  # lines, adjust them as necessary, and remove the curly braces after 'resources:'.
  # limits:
  #  cpu: 100m
  #  memory: 128Mi
  # requests:
  #  cpu: 100m
  #  memory: 128Mi

nodeSelector: {}

tolerations: []

affinity: {}

```

可根据 [Helm 应用开发规范](../helm-specification) 编辑 nginx 目录下文件，编辑好后保存。

### 生成索引文件（可选）

若添加 HTTP 或 HTTPS 协议的仓库，则需要预先在对象存储中上传索引文件 `index.yaml`，该文件由 Helm 客户端工具生成。若添加 S3 协议的仓库，在上传应用到仓库时将自动在对象存储中生成索引文件。在 nginx 上一级目录执行以下命令生成索引文件：

```bash
$ helm repo index .
$ ls
index.yaml  nginx

```

### 打包应用

回到 nginx 上级目录，执行打包命令，将生成一个 tgz 格式的压缩文件，即 nginx 应用配置包：

```bash
$ helm package nginx
$ ls
nginx  nginx-0.1.0.tgz
```
至此，应用配置包就已经准备完毕。

## 上传应用

接下来就可以通过开发者中心上传应用到平台，由平台管理员部署应用到 K8S中。

### Helm开发模板参考


Helm Chart 是一种打包规范，将各种 Kubernetes 资源以配置文件的形式组织。更详细的介绍请参考 [Chart 官网文档](https://github.com/helm/helm/blob/master/docs/charts.md)

#### Chart 文件结构

一个 Chart 包由以下几个配置文件组成：

```
wordpress/
  Chart.yaml          # Yaml文件，用于描述 Chart 的基本信息，包括名称版本等
  LICENSE             # [可选] 文本格式的协议
  README.md           # [可选] 应用介绍、使用说明
  requirements.yaml   # [可选] 用于存放当前 Chart 依赖的其它 Chart 的说明文件
  values.yaml         # Chart 的默认值配置文件
  charts/             # [可选] 该目录中放置当前 Chart 依赖的其它 Chart
  templates/          # [可选] 部署文件模版目录，模版填入 values.yaml 中相应值，生成最终的 kubernetes 配置文件
  templates/NOTES.txt # [可选] 使用指南
```

#### Chart.yaml 文件

```
apiVersion: [必须] Chart API 版本，可用值 v1
name: [必须] Chart 名称
version: [必须] 版本，遵循 [SemVer 2 标准](https://semver.org/)
kubeVersion: [可选] 兼容的 Kubernetes 版本，遵循 [SemVer 2 标准](https://semver.org/)
description: [可选] 一句话的应用描述
keywords:
  - [可选] 应用关键字列表
home: [可选] 应用主页 URL
sources:
  - [可选] 当前应用下载地址列表
maintainers: [可选]
  - name: [必须] name 
    email: [可选] email
    url: [可选] url
engine: [可选] 模板引擎，默认值是 gotpl
icon: [可选] SVG 或者 PNG 格式的图片地址
appVersion: [可选] 应用版本
deprecated: [可选] boolean 类型，是否不建议使用
tillerVersion: [可选] Chart 需要的 Tiller 版本，遵循 [SemVer 2 标准](https://semver.org/)，需要 ">2.0.0"
```

#### Requirements.yaml 文件和 Charts 目录

Chart支持两种方式表示依赖关系，可以写入 requirements.yaml 文件动态链接[推荐]，也可以将依赖的 Chart 放入 charts 目录手动管理。

`requirements.yaml` 文件样例：

```
dependencies:
  - name: apache
    version: 1.2.3
    repository: http://example.com/charts
  - name: mysql
    version: 3.2.1
    repository: http://another.example.com/charts
```

* name：Chart 名称
* version：Chart 版本
* repository: Chart 仓库 URL 地址

有了 `requirements.yaml` 文件，可以运行 `helm dependency update`，依赖的 Chart 会被自动的下载到 `charts` 目录下。

#### Values.yaml 文件和 Templates 目录

`values.yaml` 文件中记录了模板中引用的默认值。
`templates` 目录中存放了 Kubernetes 部署文件的模版，遵循 [Go template 语法](https://golang.org/pkg/text/template/)

`templates` 中模板文件样例：

```
apiVersion: v1
kind: ReplicationController
metadata:
  name: deis-database
  namespace: deis
  labels:
    app.kubernetes.io/managed-by: deis
spec:
  replicas: 1
  selector:
    app.kubernetes.io/name: deis-database
  template:
    metadata:
      labels:
        app.kubernetes.io/name: deis-database
    spec:
      serviceAccount: deis-database
      containers:
        - name: deis-database
          image: {{.Values.imageRegistry}}/postgres:{{.Values.dockerTag}}
          imagePullPolicy: {{.Values.pullPolicy}}
          ports:
            - containerPort: 5432
          env:
            - name: DATABASE_STORAGE
              value: {{default "minio" .Values.storage}}
```

上述样例是一个k8s中 replication controller 的模板文件定义，其中引用了以下几个值（一般定义在 values.yaml 中）

* imageRegistry：Docker 映像仓库
* dockerTag: Docker 映像标签
* pullPolicy: 下载映像策略
* storage: 存储后端，默认值是 "minio"

`values.yaml` 文件样例：

```
imageRegistry: "quay.io/deis"
dockerTag: "latest"
pullPolicy: "Always"
storage: "s3"
```


## 部署环境



## 鉴权

